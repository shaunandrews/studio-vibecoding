<script setup lang="ts">
import { ref, nextTick } from 'vue'

interface HistoryEntry {
  command: string
  output: string
}

const SIMULATED_COMMANDS: Record<string, string> = {
  'wp plugin list --status=active': `+--------------------------+----------+-----------+---------+
| name                     | status   | update    | version |
+--------------------------+----------+-----------+---------+
| downstreet-reservations  | active   | none      | 1.2.0   |
| downstreet-events        | active   | none      | 0.4.0   |
| cafe-loyalty-card        | active   | none      | 0.1.0   |
| jetpack                  | active   | available | 14.2    |
| woocommerce              | inactive | none      | 9.5.1   |
+--------------------------+----------+-----------+---------+`,
  'wp plugin list': `+--------------------------+----------+-----------+---------+
| name                     | status   | update    | version |
+--------------------------+----------+-----------+---------+
| downstreet-reservations  | active   | none      | 1.2.0   |
| downstreet-events        | active   | none      | 0.4.0   |
| cafe-loyalty-card        | active   | none      | 0.1.0   |
| jetpack                  | active   | available | 14.2    |
| woocommerce              | inactive | none      | 9.5.1   |
+--------------------------+----------+-----------+---------+`,
  'wp scaffold block cafe-hours --plugin=downstreet-events': `Success: Created block 'cafe-hours' in plugin 'downstreet-events'.
  - block.json
  - edit.js
  - editor.scss
  - style.scss
  - render.php`,
  'phpunit --filter=ReservationTest': `PHPUnit 10.5.1 by Sebastian Bergmann.

..F..                                                  5 / 5 (100%)

FAILURES!

Tests: 5, Assertions: 12, Failures: 1.

1) ReservationTest::test_rest_route_returns_valid_response
Failed asserting that WP_Error Object (...) is an instance of "WP_REST_Response".

/wp-content/plugins/downstreet-reservations/tests/test-reservation.php:47`,
  'wp theme list': `+--------------------+----------+-----------+---------+
| name               | status   | update    | version |
+--------------------+----------+-----------+---------+
| downstreet-starter | active   | none      | 1.0.0   |
| twentytwentyfive   | inactive | none      | 1.0     |
+--------------------+----------+-----------+---------+`,
  'ls': `wp-content/  wp-config.php  index.php  wp-login.php`,
  'pwd': `/var/www/html`,
  'clear': '',
  'help': `Available commands (simulated):
  wp plugin list          List installed plugins
  wp theme list           List installed themes
  wp scaffold block       Scaffold a new block
  phpunit                 Run PHP unit tests
  ls, pwd, clear          Basic shell commands`,
}

const history = ref<HistoryEntry[]>([])
const inputValue = ref('')
const outputRef = ref<HTMLElement | null>(null)

function runCommand() {
  const cmd = inputValue.value.trim()
  if (!cmd) return

  if (cmd === 'clear') {
    history.value = []
    inputValue.value = ''
    return
  }

  const output = SIMULATED_COMMANDS[cmd] ?? `bash: ${cmd.split(' ')[0]}: command not found`
  history.value.push({ command: cmd, output })
  inputValue.value = ''

  nextTick(() => {
    if (outputRef.value) {
      outputRef.value.scrollTop = outputRef.value.scrollHeight
    }
  })
}
</script>

<template>
  <div class="terminal">
    <div ref="outputRef" class="terminal__output">
      <div v-for="(entry, i) in history" :key="i" class="terminal__entry">
        <div class="terminal__line">
          <span class="terminal__prompt">$</span> <span class="terminal__cmd">{{ entry.command }}</span>
        </div>
        <pre v-if="entry.output" class="terminal__result">{{ entry.output }}</pre>
      </div>
    </div>
    <div class="terminal__input">
      <span class="terminal__prompt">$</span>
      <input
        v-model="inputValue"
        class="terminal__field"
        type="text"
        spellcheck="false"
        autocomplete="off"
        placeholder="Type a command..."
        @keydown.enter="runCommand"
      />
    </div>
  </div>
</template>

<style scoped>
.terminal {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.terminal__output {
  flex: 1;
  margin: 0;
  padding: var(--space-s);
  padding-block-end: 0;
  overflow: auto;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-s);
  line-height: var(--line-height-normal);
  color: var(--color-text-secondary);
}

.terminal__entry + .terminal__entry {
  margin-block-start: var(--space-xs);
}

.terminal__line {
  white-space: pre;
}

.terminal__result {
  margin: 0;
  white-space: pre;
  font: inherit;
  color: var(--color-text-secondary);
}

.terminal__prompt {
  color: var(--color-status-running);
  user-select: none;
}

.terminal__cmd {
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
}

/* ── Input ── */
.terminal__input {
  display: flex;
  align-items: center;
  gap: var(--space-xxs);
  padding: var(--space-xs) var(--space-s);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-s);
}

.terminal__field {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font: inherit;
  color: var(--color-text);
  caret-color: var(--color-primary);
}

.terminal__field::placeholder {
  color: var(--color-text-muted);
}
</style>
