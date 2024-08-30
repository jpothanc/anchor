<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import {
    fetchData,
    modifiedRowsStore,
    type IModifiedRow,
  } from "../lib/utils";
  import DataGrid from "./DataGrid.svelte";

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
      const config = {
        method: "get",
        url: "http://localhost:8080/api/v1/equity/products",
      };
      return await fetchData(config);
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
<div class="flex flex-col min-h-96">
  <DataGrid rowData={apiData} />
  <div class="border flex justify-end px-2">
  <button on:click={saveData} class="bg-red-500">Save Data</button>
  </div>
  </div>
{:else}
  <p class="text-white">Loading...</p>
{/if}
