<template>
  <div>
    <v-container class="my-auto px-7">
      <v-layout>
        <v-flex grow>
          <h2 class="font-weight-light primary--text">Inbox</h2>
        </v-flex>
        <v-flex shrink py-1 no-wrap>
          <v-btn color="primary" @click="reload()">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
          <v-btn color="primary" @click="compose({})">
            Compose <v-icon>mdi-email-edit-outline</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout wrap>
        <v-flex grow class="py-1 elevation-2">
          <v-tabs
            v-model="tab"
            show-arrows
            grow
            class="fill-width"
            height="60px"
          >
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab v-for="t in tabs" :key="t">
              <div class="caption py-1">
                {{ t.name }}
                <v-badge overlap>
                  <template v-slot:badge v-if="countItems(t.name) > 0">
                    <span class="caption">{{ countItems(t.name) }}</span>
                  </template>
                  <v-icon v-text="t.icon"></v-icon>
                </v-badge>
              </div>
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab" grow class="mh-580 pa-4">
            <v-tab-item>
              <v-row
                v-for="(message, i) in filteredMessages"
                :key="i"
                class="mb-5 pb-2 elevation-1"
                align-center
              >
                <v-col
                  sm="6"
                  cols="6"
                  class="py-0"
                  @click.stop="readMessage(message)"
                  :style="{ cursor: 'pointer' }"
                >
                  <h4 :class="!message.read ? 'font-italic' : ''">
                    {{ message.from }}
                    <v-icon v-show="message.read" small title="Read">
                      mdi-check
                    </v-icon>
                  </h4>
                </v-col>
                <v-col sm="6" cols="6" class="text-right caption py-0">
                  {{ message.dtSent }}
                  <v-btn
                    icon
                    x-small
                    @click="markDeleted(message)"
                    title="Mark for deletion"
                  >
                    <v-icon>mdi-trash-can</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" class="py-0" @click="readMessage(message)">
                  <div>{{ message.subject }}</div>
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item>
              <div v-if="deletedMessages.length === 0" class="text-center px-2">
                No deleted messages
              </div>
              <div
                v-for="(message, i) in deletedMessages"
                :key="i"
                class="px-2"
              >
                {{ message.dtSent }} - {{ message.from }}
                <v-btn
                  icon
                  small
                  @click="restoreToInbox(message)"
                  title="Undelete and move to Inbox"
                >
                  <v-icon>mdi-email-plus-outline</v-icon>
                </v-btn>
              </div>
            </v-tab-item>
            <v-tab-item>
              <div v-if="sent.length === 0" class="text-center px-2">
                No sent messages
              </div>
              <div v-for="(message, i) in sent" :key="i" class="px-2">
                {{ message.dtSent }} - {{ message.to }} {{ message.subject }}
              </div>
            </v-tab-item>
            <v-tab-item>
              <div v-if="drafts.length === 0" class="text-center px-2">
                No drafts
              </div>
              <div v-for="(message, i) in drafts" :key="i" class="px-2">
                (draft) {{ message.to }} {{ message.subject }}
                <v-btn icon small @click="compose(message)">
                  <v-icon>mdi-email-edit-outline</v-icon>
                </v-btn>
                <v-btn icon small @click="deleteDraft(i)">
                  <v-icon>mdi-trash-can</v-icon>
                </v-btn>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="dialogRead" width="500">
      <v-card>
        <v-card-title class="headline" primary-title>
          {{ activeMessage.from }}
        </v-card-title>
        <v-card-text class="pa-5">
          <div v-html="activeMessage.body"></div>
        </v-card-text>
        <v-card-actions class="pa-5">
          <v-btn color="red" @click="markDeleted(activeMessage)" outlined
            >Delete</v-btn
          >
          <v-btn
            class="ml-auto"
            @click="dialogRead = false"
            outlined
            color="primary"
            >Close</v-btn
          >
          <v-btn color="primary" @click="compose(activeMessage)">Reply</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogCompose" width="500">
      <v-card>
        <v-card-title class="headline black" primary-title>
          Compose Message
        </v-card-title>
        <v-card-text class="pa-5">
          <v-form ref="sendForm" v-model="valid" lazy-validation>
            <v-text-field
              v-model="composeMessage.from"
              label="From"
              :rules="[rules.required, rules.email]"
            ></v-text-field>
            <v-text-field
              v-model="composeMessage.to"
              label="To"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              v-model="composeMessage.subject"
              label="Subject"
              :rules="[rules.required]"
            ></v-text-field>
            <div v-html="composeMessage.originalBody"></div>
            <v-textarea
              v-model="composeMessage.body"
              label="Message"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-5">
          <v-btn
            class="ml-auto"
            @click="saveDraft(composeMessage)"
            outlined
            color="primary"
            >Cancel</v-btn
          >
          <v-btn color="primary" :disabled="!valid" @click="validate">
            Send
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
/* eslint-disable object-property-newline */
/* eslint-disable no-unreachable */
const allMessages = [
  {
    id: 1,
    from: 'Gary Lewis',
    fromAddress: 'test@foofoo.com',
    subject: 'I saw this posting on the board',
    dtSent: 'Today, 9:18AM',
    read: false,
    deleted: false,
    body:
      'Hey Mark,<br><br>I saw your post on the message board and I was wondering if you still had that item available. Can you call me if you still do?<br><br>Thanks,<br><b>Gary Lewis</b>'
  },
  {
    id: 2,
    from: 'Bob Sutton',
    fromAddress: 'test@testdomain.com',
    subject: 'In Late Today',
    dtSent: 'Today, 8:54AM',
    read: false,
    deleted: false,
    body: 'Mark,<br>I will be in late today due to an appt.<br>v/r Bob',
    attachment: false
  },
  {
    id: 3,
    from: 'Will Adivo',
    fromAddress: 'test@testbar.com',
    subject: 'New developer',
    dtSent: 'Yesterday, 4:48PM',
    read: true,
    deleted: false,
    body:
      'Here is the last resume for the developer position we posted on SO. Please review and let me know your thoughts!',
    attachment: true
  },
  {
    id: 4,
    from: 'Al Kowalski',
    fromAddress: 'test@domain.com',
    subject: 'RE: New developer',
    dtSent: 'Yesterday, 4:40PM',
    read: false,
    deleted: false,
    body: 'I looked at the resume, but the guy looks like a moron.',
    priority: 1
  },
  {
    id: 4,
    from: 'Beth Maloney',
    fromAddress: 'test@mail.com',
    subject: 'July Reports',
    dtSent: '3 Days Ago',
    read: true,
    deleted: false,
    body:
      'PYC Staff-<br> Our weekly meeting is canceled due to the holiday. Please review and submit your PID report before next week\'s meeting.<br>Thanks,<br>Beth'
  },
  {
    id: 6,
    from: 'Jason Furgano',
    fromAddress: 'test@domain.com',
    subject: 'New developer',
    dtSent: '3 Days Ago',
    read: false,
    deleted: false,
    body:
      'All,<br>I\'d like to introduce Joe Canfigliata our new S/W developer. If you see him in the office introduce yourself and make him feel welcome.'
  },
  {
    id: 7,
    from: 'Bob Sutton',
    fromAddress: 'test@test.com',
    subject: 'Tasking request',
    dtSent: '3 Days Ago',
    read: true,
    deleted: false,
    body: 'Ovi lipsu doir. The message body goes here...'
  },
  {
    id: 8,
    from: 'Will Adivo',
    fromAddress: 'test@test.com',
    subject: 'Proposal for Avid Consulting',
    dtSent: '3 Days Ago',
    read: false,
    deleted: false,
    body:
      'Mark, I reviewed your proposal with Beth and we have a few questions. Let me know when you time to meet.'
  },
  {
    id: 9,
    from: 'Philip Corrigan',
    fromAddress: 'test@testdomain.com',
    subject: 'Follow-up Appt.',
    dtSent: '4 Days Ago',
    read: true,
    deleted: false,
    body:
      'Hi,<br>Can you please confirm the expense report I submitted for my last trip to SD?<br>Thanks,<br>Tom Grey'
  }
]
export default {
  data() {
    return {
      messages: [...allMessages],
      drafts: [],
      sent: [],
      dialogRead: false,
      dialogCompose: false,
      activeMessage: {},
      composeMessage: {},
      valid: true,
      rules: {
        required: (value) => !!value || 'This field is required',
        email: (v) => (/.+@.+\..+/).test(v) || 'Must be a valid email'
      },
      tab: 0,
      tabs: [
        { name: 'Messages', icon: 'mdi-email' },
        { name: 'Deleted', icon: 'mdi-trash-can' },
        { name: 'Sent', icon: 'mdi-email-send' },
        { name: 'Drafts', icon: 'mdi-email-edit-outline' }
      ]
    }
  },
  computed: {
    filteredMessages() {
      return this.messages.filter((m) => {
        return !m.deleted
      })
    },
    deletedMessages() {
      return this.messages.filter((m) => {
        return m.deleted
      })
    }
  },
  methods: {
    readMessage(message) {
      this.activeMessage = message
      this.dialogRead = true
      message.read = true
    },
    markDeleted(message) {
      message.deleted = true
    },
    restoreToInbox(message) {
      message.deleted = false
    },
    compose(activeMessage) {
      this.composeMessage = {
        id: new Date(), // use timestamp for id for demo
        to: activeMessage.from,
        subject: activeMessage.subject,
        originalBody: activeMessage.body
      }
      this.dialogRead = false
      this.dialogCompose = true
    },
    saveDraft(message) {
      this.dialogCompose = false
      this.drafts.push(message)
    },
    deleteDraft(i) {
      this.drafts.splice(i, 1)
    },
    validate() {
      if (this.$refs.sendForm.validate()) {
        // send it
        this.send(this.composeMessage)
      }
    },
    send(message) {
      // send the message via API/server endpoint here
      this.dialogCompose = false
      this.drafts.splice(
        this.drafts.findIndex((m) => m.id === message.id),
        1
      )
      message.dtSent = '1 min ago'
      this.sent.push(message)
    },
    reload() {
      // refresh the messages from API/server endpoint here
      this.messages = allMessages
      this.drafts = []
      this.sent = []
    },
    countItems(list) {
      switch (list) {
        case 'Messages':
          return this.filteredMessages.length
          break
        case 'Deleted':
          return this.deletedMessages.length
          break
        case 'Sent':
          return this.sent.length
          break
        case 'Drafts':
          return this.drafts.length
          break
        default:
          return 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}

.mh-580 {
  min-height: 580px;
}
</style>
