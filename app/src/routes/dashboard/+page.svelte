<script lang="ts">
  import { getContext } from "svelte"
  import type { Readable } from "svelte/store"
  import type { User } from "../../stores/user";
  import { type AppClient } from "../../api/appClient";
  import { type NotificationCTX } from "$lib/components/RequestNotifications/context";


  const http = getContext<AppClient>('client')
  const notifications = getContext<NotificationCTX>('notifications')

  let brand = ""

  const demoReq = async () => {
    const response = await http.api.cars.post({ brand, topSpeed: 220 })
    if (!response.error)
      notifications.report()
  }

  export let data

  const user = getContext<Readable<User>>("user")
</script>

<svelte:head>
  <title>Dashboard</title>
  <meta name="description" content={data.items?.map(i => i).join(", ")} />
</svelte:head>

<main>
  Dashboard page
  You are logged in as: {$user?.name}

  <input type="text" bind:value={brand} />
  <button on:click={demoReq}>Post</button>

  {#if data.items}
    {#each data.items as item}
      <p>{item}</p>
    {/each}
  {/if}
</main>