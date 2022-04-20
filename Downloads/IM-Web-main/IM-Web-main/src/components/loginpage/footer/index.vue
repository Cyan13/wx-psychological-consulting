<template>
  <div class="footer-link">
    <p>Copyright © 2018 Design and Development By ecnuer</p>
    <p>
      Contact Me by github :
      <a
        href="https://github.com/ecnuer"
        target="_blank"
        title="ecnuer"
      >ECNUER</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Foot'
}
</script>

<style lang="scss">
.footer-link {
  position: relative;
  font-size: 18px;
  bottom: 40px;
  left: 0;
  color: black;
  text-align: center;
  width: 100%;
  z-index: 1001;
  p {
    a {
      color: #010109;
      cursor: pointer;
    }
  }
}
</style>
