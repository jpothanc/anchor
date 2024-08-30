<script lang="ts">
  let navItems = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
  ];
</script>

<nav
  class="flex justify-between items-center px-2 sticky
top-0 mx-auto bg-white h-12 border-b border-blue-500"
>
  <div class="font-bold text-2xl">
    <a href="/">Anchor</a>
  </div>
  <ul class="flex gap-2 list-none">
    {#each navItems as item}
      <li><a href={item.href}>{item.name}</a></li>
    {/each}
  </ul>
</nav>

<style>
  
</style>
