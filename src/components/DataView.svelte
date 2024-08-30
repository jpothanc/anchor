<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import {
    fetchData,
    modifiedRowsStore,
    type IModifiedRow,
  } from "../lib/utils";
  import DataGrid from "./DataGrid.svelte";
  import config from "../config/config.json";

  let apiData: any = null;
  let error: string | null = null;
  let modifiedRows: IModifiedRow[] = [];

  const unsubscribe = modifiedRowsStore.subscribe((value: IModifiedRow[]) => {
    modifiedRows = value;
  });

  onDestroy(() => {
    unsubscribe();
  });

  onMount(() => {
    fetchApiData().then((data) => {
      apiData = data.data;
    });
  });

  async function fetchApiData(): Promise<any> {
    try {
      const apiConfig = {
        method: "get",
        url: config.api.products,
      };
      return await fetchData(apiConfig);
    } catch (err: any) {
      error = err.message;
    }
  }

  function saveData(
    event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
  ) {
    console.log("Saving data...");
    modifiedRows.forEach((row) => {
      console.log(row);
    });
  }
</script>

{#if error}
  <p>{error}</p>
{:else if apiData}
  <div class="flex flex-col">
    <DataGrid rowData={apiData} />
    <div class="flex justify-end px-2">
      <button
        on:click={saveData}
        class="bg-blue-500 text-white font-semibold text-sm px-2 py-1"
        >Save</button
      >
    </div>
  </div>
{:else}
  <p class="text-white">Loading...</p>
{/if}
