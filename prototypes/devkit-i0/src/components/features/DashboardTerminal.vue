<template>
  <div class="terminal">
    <pre class="terminal__output">
<span class="terminal__prompt">$</span> <span class="terminal__cmd">wp plugin list --status=active</span>
+--------------------------+----------+-----------+---------+
| name                     | status   | update    | version |
+--------------------------+----------+-----------+---------+
| downstreet-reservations  | active   | none      | 1.2.0   |
| downstreet-events        | active   | none      | 0.4.0   |
| cafe-loyalty-card        | active   | none      | 0.1.0   |
| jetpack                  | active   | available | 14.2    |
| woocommerce              | inactive | none      | 9.5.1   |
+--------------------------+----------+-----------+---------+

<span class="terminal__prompt">$</span> <span class="terminal__cmd">wp scaffold block cafe-hours --plugin=downstreet-events</span>
<span class="terminal__success">Success:</span> Created block 'cafe-hours' in plugin 'downstreet-events'.
  - block.json
  - edit.js
  - editor.scss
  - style.scss
  - render.php

<span class="terminal__prompt">$</span> <span class="terminal__cmd">phpunit --filter=ReservationTest</span>
PHPUnit 10.5.1 by Sebastian Bergmann.

..F..                                                  5 / 5 (100%)

<span class="terminal__fail">FAILURES!</span>

Tests: 5, Assertions: 12, Failures: 1.

1) ReservationTest::test_rest_route_returns_valid_response
Failed asserting that WP_Error Object (...) is an instance of "WP_REST_Response".

/wp-content/plugins/downstreet-reservations/tests/test-reservation.php:47
</pre>
    <div class="terminal__input">
      <span class="terminal__prompt">$</span>
      <span class="terminal__cursor">&#9612;</span>
    </div>
  </div>
</template>

<style scoped>
.terminal {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-chrome);
  border-radius: var(--radius-m);
  margin: var(--space-xs);
  overflow: hidden;
}

.terminal__output {
  flex: 1;
  margin: 0;
  padding: var(--space-s);
  overflow: auto;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-s);
  line-height: 1.5;
  color: var(--color-chrome-text-secondary);
  white-space: pre;
  tab-size: 4;
}

.terminal__prompt {
  color: var(--color-status-running);
  user-select: none;
}

.terminal__cmd {
  color: var(--color-chrome-text);
  font-weight: var(--font-weight-medium);
}

.terminal__success {
  color: var(--color-status-running);
  font-weight: var(--font-weight-medium);
}

.terminal__fail {
  color: var(--color-status-stop-hover);
  font-weight: var(--font-weight-semibold);
}

/* ── Input prompt ── */
.terminal__input {
  display: flex;
  align-items: center;
  gap: var(--space-xxs);
  padding: var(--space-xxs) var(--space-s);
  padding-block-end: var(--space-s);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-s);
}

.terminal__cursor {
  color: var(--color-chrome-text);
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
