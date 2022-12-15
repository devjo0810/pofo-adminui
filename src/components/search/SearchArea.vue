<template>
  <div class="search-area">
    <table class="search-area-table">
      <colgroup>
        <slot name="colgroup" />
      </colgroup>
      <tbody>
        <slot name="tbody" />
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "SearchArea",
};
</script>

<style lang="scss">
.search-area {
  width: 100%;
  border-top: 1px solid map-get($colors, "black-lighten1");
  margin-bottom: 20px;
  .search-area-table {
    width: 100%;
    background-color: map-get($colors, "white-lighten1");
    .cellw {
      min-width: 5%;
    }
    tr {
      > th {
        background-color: map-get($colors, "white");
        text-align: right;
        padding: 9px;
        font-size: 1.1rem;
        border-left: 1px solid map-get($colors, "white-darken1");
        border-right: 1px solid map-get($colors, "white-darken1");
        border-bottom: 1px solid map-get($colors, "white-darken1");
      }
      > td {
        padding: 0 5px;
        border-bottom: 1px solid map-get($colors, "white-darken1");
        &:last-child {
          border-right: 1px solid map-get($colors, "white-darken1");
        }
      }
    }
  }
}
</style>
