<?php
 return array (
  'name' => 'test',
  'label' => 'test',
  '_id' => 'test',
  'fields' => 
  array (
    0 => 
    array (
      'name' => 'test',
      'label' => '',
      'type' => 'repeater',
      'default' => '',
      'info' => '',
      'group' => '',
      'localize' => false,
      'options' => 
      array (
        'fields' => 
        array (
          0 => 
          array (
            'type' => 'set',
            'label' => 'Full Name',
            'options' => 
            array (
              'fields' => 
              array (
                0 => 
                array (
                  'name' => 'firstname',
                  'type' => 'text',
                ),
                1 => 
                array (
                  'name' => 'lastname',
                  'type' => 'text',
                ),
              ),
            ),
          ),
          1 => 
          array (
            'type' => 'collectionlink',
            'label' => 'social_providers',
            'options' => 
            array (
              'link' => '{name}',
              'multiple' => false,
              'limit' => false,
            ),
          ),
        ),
      ),
      'width' => '1-1',
      'lst' => true,
      'acl' => 
      array (
      ),
    ),
  ),
  'data' => NULL,
  '_created' => 1614857037,
  '_modified' => 1614857132,
  'description' => '',
  'acl' => 
  array (
  ),
);