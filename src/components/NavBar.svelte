<script lang="ts">
  let navItems = [
    { name: "Home", href: "/" },
   
    { name: "Contact", href: "/contact" },
  ];
</script>

<nav class="flex justify-between items-center px-2 sticky top-0 mx-auto bg-white border-2 border-red-200 ">
  <div class="logo">
    <a href="/">Anchor</a>
  </div>
  <ul class="flex gap-2 list-none">
    {#each navItems as item}
      <li><a href={item.href}>{item.name}</a></li>
    {/each}
  </ul>
</nav>

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #f8f9fa;
  }

  .logo a {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    color: #333;
  }

  
</style>
