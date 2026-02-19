import type { Conversation, Message } from './types'

// ---------------------------------------------------------------------------
// Seed conversations — pre-populated dev-focused Kit conversations
// ---------------------------------------------------------------------------

export const seedConversations: Conversation[] = [
  {
    id: 'conv-rest-endpoint',
    projectId: 'downstreet-cafe',
    agentId: 'assistant',
    title: 'Fix the reservation REST endpoint',
    createdAt: '2026-02-14T09:30:00Z',
  },
  {
    id: 'conv-hours-block',
    projectId: 'downstreet-cafe',
    agentId: 'assistant',
    title: 'Scaffold the hours block',
    createdAt: '2026-02-16T14:00:00Z',
  },
  {
    id: 'conv-sync-debug',
    projectId: 'jetpack-feature',
    agentId: 'assistant',
    title: 'Debug the sync module',
    createdAt: '2026-02-18T11:15:00Z',
  },
]

export const seedMessages: Message[] = [
  // -----------------------------------------------------------------------
  // Conversation 1 — Fix the reservation REST endpoint (downstreet-cafe)
  // -----------------------------------------------------------------------
  {
    id: 'msg-rest-1',
    conversationId: 'conv-rest-endpoint',
    role: 'user',
    content: [{ type: 'text', text: "Kit, I'm getting a fatal error in my reservations plugin. Something about the REST route." }],
    timestamp: '2026-02-14T09:30:00Z',
  },
  {
    id: 'msg-rest-2',
    conversationId: 'conv-rest-endpoint',
    role: 'agent',
    agentId: 'assistant',
    content: [{
      type: 'text',
      text: "Your `register_rest_route` callback in `downstreet-reservations` is returning a `WP_Error` that never gets handled by the response layer. When the error bubbles up without a proper status code, WordPress chokes and you get that fatal.\n\nThe fix: check for `is_wp_error()` in your callback and return a `WP_REST_Response` with the right status code instead of letting the raw error fall through.",
    }],
    timestamp: '2026-02-14T09:30:15Z',
  },
  {
    id: 'msg-rest-3',
    conversationId: 'conv-rest-endpoint',
    role: 'user',
    content: [{ type: 'text', text: 'That makes sense. Can you show me exactly what to change?' }],
    timestamp: '2026-02-14T09:31:00Z',
  },
  {
    id: 'msg-rest-4',
    conversationId: 'conv-rest-endpoint',
    role: 'agent',
    agentId: 'assistant',
    content: [{
      type: 'text',
      text: "Here's the before and after for your callback in `includes/rest-api.php`:\n\n**Before:**\n```php\nfunction handle_reservation( $request ) {\n    $result = create_reservation( $request->get_params() );\n    return $result; // WP_Error falls through unhandled\n}\n```\n\n**After:**\n```php\nfunction handle_reservation( $request ) {\n    $result = create_reservation( $request->get_params() );\n\n    if ( is_wp_error( $result ) ) {\n        return new WP_REST_Response(\n            array( 'message' => $result->get_error_message() ),\n            400\n        );\n    }\n\n    return new WP_REST_Response( $result, 201 );\n}\n```\n\nThe key change: wrap the return in `WP_REST_Response` for both success and error paths. The `201` status is correct for resource creation, `400` for bad input. If you want to distinguish between validation errors and server errors, you could check `$result->get_error_code()` and map to the right HTTP status.",
    }],
    timestamp: '2026-02-14T09:31:30Z',
  },

  // -----------------------------------------------------------------------
  // Conversation 2 — Scaffold the hours block (downstreet-cafe)
  // -----------------------------------------------------------------------
  {
    id: 'msg-hours-1',
    conversationId: 'conv-hours-block',
    role: 'user',
    content: [{ type: 'text', text: 'I need a new block to display the cafe\'s opening hours.' }],
    timestamp: '2026-02-16T14:00:00Z',
  },
  {
    id: 'msg-hours-2',
    conversationId: 'conv-hours-block',
    role: 'agent',
    agentId: 'assistant',
    content: [{
      type: 'text',
      text: "I'll scaffold a `cafe-hours` block in the events plugin. It'll have a `block.json` with the day/time attributes, an edit component with inline editing, and a PHP render template.",
    }],
    timestamp: '2026-02-16T14:00:10Z',
  },
  {
    id: 'msg-hours-3',
    conversationId: 'conv-hours-block',
    role: 'agent',
    agentId: 'assistant',
    content: [{
      type: 'card',
      card: 'progress',
      data: {
        label: 'Scaffolding café-hours block',
        steps: [
          { name: 'Create block.json', status: 'done' },
          { name: 'Create edit.js', status: 'done' },
          { name: 'Create render.php', status: 'done' },
          { name: 'Register block', status: 'done' },
          { name: 'Build assets', status: 'done' },
        ],
      },
    }],
    timestamp: '2026-02-16T14:00:25Z',
  },
  {
    id: 'msg-hours-4',
    conversationId: 'conv-hours-block',
    role: 'agent',
    agentId: 'assistant',
    content: [{
      type: 'text',
      text: "Block scaffolded. You can find it at `wp-content/plugins/downstreet-events/blocks/cafe-hours/`.\n\nThe edit component has 7 day slots with start/end time pickers and a toggle for closed days. The render template outputs a `<table>` with `wp-block-cafe-hours` class so you can style it with theme.json.\n\nWant me to add some default hour slots to the edit component?",
    }],
    timestamp: '2026-02-16T14:00:30Z',
  },

  // -----------------------------------------------------------------------
  // Conversation 3 — Debug the sync module (jetpack-feature)
  // -----------------------------------------------------------------------
  {
    id: 'msg-sync-1',
    conversationId: 'conv-sync-debug',
    role: 'user',
    content: [{ type: 'text', text: 'The sync module is throwing errors when I try to sync post meta. Can you help?' }],
    timestamp: '2026-02-18T11:15:00Z',
  },
  {
    id: 'msg-sync-2',
    conversationId: 'conv-sync-debug',
    role: 'agent',
    agentId: 'assistant',
    content: [{ type: 'text', text: "What does the error say? Can you share the `debug.log` output?" }],
    timestamp: '2026-02-18T11:15:10Z',
  },
  {
    id: 'msg-sync-3',
    conversationId: 'conv-sync-debug',
    role: 'user',
    content: [{ type: 'text', text: "It says 'Invalid meta key' for `_custom_field_abc`." }],
    timestamp: '2026-02-18T11:16:00Z',
  },
  {
    id: 'msg-sync-4',
    conversationId: 'conv-sync-debug',
    role: 'agent',
    agentId: 'assistant',
    content: [{
      type: 'text',
      text: "Post meta keys starting with `_` are considered protected in WordPress. The Sync module filters these out by default since they're typically internal/private meta.\n\nYou have two options:\n\n1. **Register the meta key explicitly** — call `register_meta()` with `show_in_rest` set to `true`. This tells WordPress (and Jetpack) the key is intentionally public:\n\n```php\nregister_meta( 'post', '_custom_field_abc', array(\n    'show_in_rest'  => true,\n    'single'        => true,\n    'type'          => 'string',\n    'auth_callback' => function() {\n        return current_user_can( 'edit_posts' );\n    },\n) );\n```\n\n2. **Add it to Jetpack's sync whitelist** — use the `jetpack_sync_post_meta_whitelist` filter:\n\n```php\nadd_filter( 'jetpack_sync_post_meta_whitelist', function( $whitelist ) {\n    $whitelist[] = '_custom_field_abc';\n    return $whitelist;\n} );\n```\n\nOption 1 is the better practice — you're declaring intent at the WordPress level rather than just patching around Jetpack's filter. Plus it makes the field available in the REST API too, which you'll probably want.",
    }],
    timestamp: '2026-02-18T11:16:20Z',
  },
]
