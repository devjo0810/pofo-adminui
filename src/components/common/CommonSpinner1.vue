<template>
  <div class="common-spinner1"></div>
</template>

<script>
export default {
  name: "CommonSpinner1",
};
</script>

<style lang="scss">
.common-spinner1,
.common-spinner1:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.common-spinner1 {
  margin: auto;
  font-size: 5px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid map-get($colors, "point");
  transform: translateZ(0);
  animation: spinner1-animation 1.1s infinite linear;
}
@keyframes spinner1-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
