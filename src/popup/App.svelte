<script lang="ts">
  let count = 0;
</script>

<div>hello world</div>
<button on:click={() => count++}>
  Clicked {count} times
</button>

<style>
  button {
    padding: 8px;
  }
</style>
