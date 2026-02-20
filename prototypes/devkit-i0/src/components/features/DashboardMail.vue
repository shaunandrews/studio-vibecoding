<script setup lang="ts">
import { ref, computed } from 'vue'

interface Email {
  id: string
  from: string
  fromName: string
  to: string
  subject: string
  date: Date
  body: string
  read: boolean
}

const now = new Date()

const emails = ref<Email[]>([
  {
    id: '1',
    from: 'wordpress@downstreet-cafe.local',
    fromName: 'WordPress',
    to: 'admin@downstreet-cafe.local',
    subject: 'Password Reset Request',
    date: new Date(now.getTime() - 2 * 60 * 1000),
    body: `Someone has requested a password reset for the following account:

Site Name: Downstreet Café
Username: admin

If this was a mistake, ignore this email and nothing will happen.

To reset your password, visit the following address:
http://downstreet-cafe.local/wp-login.php?action=rp&key=abcdef123456&login=admin

This password reset request originated from the IP address 127.0.0.1.`,
    read: false,
  },
  {
    id: '2',
    from: 'wordpress@downstreet-cafe.local',
    fromName: 'WordPress',
    to: 'admin@downstreet-cafe.local',
    subject: 'New User Registration: jessicam',
    date: new Date(now.getTime() - 18 * 60 * 1000),
    body: `New user registration on your site Downstreet Café:

Username: jessicam
Email: jessica.martinez@example.com
Role: Subscriber

To manage this user, visit:
http://downstreet-cafe.local/wp-admin/user-edit.php?user_id=4`,
    read: false,
  },
  {
    id: '3',
    from: 'woocommerce@downstreet-cafe.local',
    fromName: 'Downstreet Café',
    to: 'admin@downstreet-cafe.local',
    subject: 'New Order: #1042 — $48.50',
    date: new Date(now.getTime() - 45 * 60 * 1000),
    body: `You've received the following order from David Chen:

Order #1042 — February 19, 2026

Product                    Qty    Price
─────────────────────────────────────────
House Blend (12oz bag)      2    $28.00
Almond Croissant            1     $6.50
Cold Brew Concentrate       1    $14.00
─────────────────────────────────────────
Subtotal:                        $48.50
Shipping: Local pickup
Total:                           $48.50
Payment method: Credit Card (Stripe)

Manage this order:
http://downstreet-cafe.local/wp-admin/post.php?post=1042&action=edit`,
    read: false,
  },
  {
    id: '4',
    from: 'wordpress@downstreet-cafe.local',
    fromName: 'WordPress',
    to: 'admin@downstreet-cafe.local',
    subject: 'Comment on "Hello World!"',
    date: new Date(now.getTime() - 3 * 60 * 60 * 1000),
    body: `A new comment on the post "Hello World!" is waiting for your approval.

Author: A WordPress Commenter
Email: wapuu@wordpress.example
URL: https://wordpress.org/

Comment:
Hi, this is a comment. To get started with moderating, editing, and deleting comments, please visit the Comments screen in the dashboard.

Approve it:   http://downstreet-cafe.local/wp-admin/comment.php?action=approve&c=1
Trash it:     http://downstreet-cafe.local/wp-admin/comment.php?action=trash&c=1
Spam it:      http://downstreet-cafe.local/wp-admin/comment.php?action=spam&c=1

Currently 1 comment is waiting for approval. Please visit the moderation panel:
http://downstreet-cafe.local/wp-admin/edit-comments.php?comment_status=moderated`,
    read: true,
  },
  {
    id: '5',
    from: 'wordpress@downstreet-cafe.local',
    fromName: 'WordPress',
    to: 'admin@downstreet-cafe.local',
    subject: 'WordPress 6.8 is available — please update',
    date: new Date(now.getTime() - 26 * 60 * 60 * 1000),
    body: `Your site at http://downstreet-cafe.local is running WordPress 6.7.2.

WordPress 6.8 is now available. Updating is easy and only takes a few moments:
http://downstreet-cafe.local/wp-admin/update-core.php

This update includes performance improvements, security fixes, and new block editor features.

If you experience any issues after updating, please visit the support forums:
https://wordpress.org/support/forums/

— The WordPress Team`,
    read: true,
  },
  {
    id: '6',
    from: 'wordpress@downstreet-cafe.local',
    fromName: 'WordPress',
    to: 'admin@downstreet-cafe.local',
    subject: 'Plugin activated: Jetpack',
    date: new Date(now.getTime() - 48 * 60 * 60 * 1000),
    body: `The plugin "Jetpack" has been successfully activated on your site Downstreet Café.

Plugin: Jetpack
Version: 14.2
Author: Automattic

You can manage your plugins at:
http://downstreet-cafe.local/wp-admin/plugins.php

To configure Jetpack, visit:
http://downstreet-cafe.local/wp-admin/admin.php?page=jetpack`,
    read: true,
  },
])

const selectedId = ref('1')

const selectedEmail = computed(() =>
  emails.value.find((e) => e.id === selectedId.value)
)

function selectEmail(email: Email) {
  selectedId.value = email.id
  email.read = true
}

function formatTime(date: Date): string {
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days === 1) return 'Yesterday'
  return `${days}d ago`
}

function formatDate(date: Date): string {
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}
</script>

<template>
  <div class="mail">
    <div class="mail__list">
      <button
        v-for="email in emails"
        :key="email.id"
        class="mail__item"
        :class="{
          'mail__item--selected': email.id === selectedId,
          'mail__item--unread': !email.read,
        }"
        @click="selectEmail(email)"
      >
        <span v-if="!email.read" class="mail__dot" />
        <span class="mail__item-content">
          <span class="mail__item-header">
            <span class="mail__item-subject">{{ email.subject }}</span>
            <span class="mail__item-time">{{ formatTime(email.date) }}</span>
          </span>
          <span class="mail__item-from">{{ email.fromName }} &lt;{{ email.from }}&gt;</span>
        </span>
      </button>
    </div>

    <div v-if="selectedEmail" class="mail__preview">
      <div class="mail__preview-header">
        <h3 class="mail__preview-subject">{{ selectedEmail.subject }}</h3>
        <div class="mail__preview-meta">
          <div class="mail__preview-row">
            <span class="mail__preview-label">From</span>
            <span>{{ selectedEmail.fromName }} &lt;{{ selectedEmail.from }}&gt;</span>
          </div>
          <div class="mail__preview-row">
            <span class="mail__preview-label">To</span>
            <span>{{ selectedEmail.to }}</span>
          </div>
          <div class="mail__preview-row">
            <span class="mail__preview-label">Date</span>
            <span>{{ formatDate(selectedEmail.date) }}</span>
          </div>
        </div>
      </div>
      <div class="mail__preview-body">
        <pre class="mail__preview-text">{{ selectedEmail.body }}</pre>
      </div>
    </div>

    <div v-else class="mail__empty">
      <span class="mail__empty-text">No email selected</span>
    </div>
  </div>
</template>

<style scoped>
.mail {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

/* ── List ── */
.mail__list {
  display: flex;
  flex-direction: column;
  inline-size: 280px;
  min-inline-size: 200px;
  flex-shrink: 0;
  overflow-y: auto;
  border-inline-end: 1px solid var(--color-surface-border);
}

.mail__item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-xxs);
  padding: var(--space-xs) var(--space-s);
  border: none;
  border-block-end: 1px solid var(--color-surface-border);
  background: var(--color-surface);
  cursor: pointer;
  text-align: start;
  font-family: inherit;
  transition: background-color 0.1s ease;
}

.mail__item:hover {
  background: var(--color-surface-secondary);
}

.mail__item--selected {
  background: var(--color-surface-secondary);
}

.mail__dot {
  flex-shrink: 0;
  inline-size: 6px;
  block-size: 6px;
  margin-block-start: var(--space-xxs);
  border-radius: 50%;
  background: var(--color-primary);
}

.mail__item-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-xxxs);
  min-inline-size: 0;
  flex: 1;
}

.mail__item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-xs);
}

.mail__item-subject {
  font-size: var(--font-size-s);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-inline-size: 0;
}

.mail__item--unread .mail__item-subject {
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
}

.mail__item-time {
  flex-shrink: 0;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.mail__item-from {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Preview ── */
.mail__preview {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-inline-size: 0;
  overflow-y: auto;
}

.mail__preview-header {
  padding: var(--space-s);
  border-block-end: 1px solid var(--color-surface-border);
  flex-shrink: 0;
}

.mail__preview-subject {
  margin: 0;
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  line-height: var(--line-height-tight);
}

.mail__preview-meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-xxxs);
  margin-block-start: var(--space-xs);
}

.mail__preview-row {
  display: flex;
  align-items: baseline;
  gap: var(--space-xxs);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
}

.mail__preview-label {
  flex-shrink: 0;
  inline-size: 35px;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
}

.mail__preview-body {
  flex: 1;
  padding: var(--space-s);
  overflow-y: auto;
}

.mail__preview-text {
  margin: 0;
  font-family: var(--font-family);
  font-size: var(--font-size-s);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
  white-space: pre-wrap;
  word-break: break-word;
}

/* ── Empty state ── */
.mail__empty {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
}

.mail__empty-text {
  font-size: var(--font-size-s);
  color: var(--color-text-muted);
}
</style>
