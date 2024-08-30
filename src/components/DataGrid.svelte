<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Handsontable from "handsontable";
  import "handsontable/dist/handsontable.full.css"; // Import Handsontable CSS
  import { modifiedRowsStore, type IModifiedRow } from "../lib/utils";

  window.addEventListener("resize", function () {
    var parentContainer = document.getElementById("hotContainer");
    const newParentWidth = parentContainer?.clientWidth;
    const newParentHeight = parentContainer?.clientHeight;
    hot.updateSettings({
      width: newParentWidth,
      height: newParentHeight,
    });
  });

  export let rowData: any[];

  async function saveData(): Promise<void> {
    const tableData: any[][] = hot.getData();
    console.log(modifiedRows);
  }
  interface ICellChange {
    row: number;
    column: string;
    oldValue: any;
    newValue: any;
  }

  let modifiedRows: IModifiedRow[] = [];

  function handleAfterChange(
    changes: Handsontable.CellChange[] | null,
    source: string
  ): void {
    if (changes && source !== "loadData") {
      changes.forEach(([row, prop, oldValue, newValue]) => {
        console.log(prop);

        const existingIndex = modifiedRows.findIndex((m) => m.index === row);

        if (existingIndex === -1) {
          const rowData = hot.getDataAtRow(row);
          modifiedRows.push({ index: row, data: rowData, isNew: false });
          modifiedRowsStore.set(modifiedRows);
        } else {
          modifiedRows[existingIndex].data = newValue;
          modifiedRowsStore.set(modifiedRows);
        }
      });
    }
  }

  function handleAfterCreateRow(index: number, amount: number): void {
    for (let i = 0; i < amount; i++) {
      const rowData = hot.getDataAtRow(index + i);
      modifiedRows.push({ index: index + i, data: rowData, isNew: true });
    }
  }

  function handleAfterRemoveRow(index: number, amount: number): void {
    // Remove the tracked changes for the deleted row
    modifiedRows = modifiedRows.filter((row) => row.index !== index);

    // Decrease the index of rows that come after the deleted row
    modifiedRows.forEach((row) => {
      if (row.index > index) {
        row.index -= amount;
      }
    });
  }

  let hotContainer: HTMLDivElement;
  let hot: Handsontable;

  onMount(() => {
    // Calculate the width of the parent container
    var parentContainer = document.getElementById("hotContainer");
    const parentWidth = parentContainer?.clientWidth;
    const parentHeight = parentContainer?.clientHeight;

    var colHeaders = Object.keys(rowData[0]);
    hot = new Handsontable(hotContainer, {
      height: parentHeight,
      width: parentWidth,

      rowHeaders: false,
      //colHeaders: false,
      contextMenu: true,
      colHeaders: colHeaders, // Set column names here
      data: rowData,
      filters: true,
      dropdownMenu: true,
      columnSorting: true,
      stretchH: "all",
      customBorders: true,
      className: "custom-table",
      copyPaste: {
        pasteMode: "shift_down", // Shifts cells down when pasting
        rowsLimit: 100,
        columnsLimit: 100,
      },
      afterChange: handleAfterChange,
      afterCreateRow: handleAfterCreateRow,
      afterRemoveRow: handleAfterRemoveRow,

      licenseKey: "non-commercial-and-evaluation", // specify the license key here
    });

    return () => {
      hot.destroy();
    };
  });
</script>

<div id="hotContainer" class="flex flex-wrap min-h-[70vh] w-full p-2 mt-10">
  <div bind:this={hotContainer}></div>
</div>

<style>
</style>
