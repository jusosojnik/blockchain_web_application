<template>
  <!--<button :style="{background: color}" class="btn">{{text}}</button>-->

  <button>Cut</button>

</template>

<script>
  export default {
    name: 'Button',
    props: {
      text: String,
      color: String,
    },
    methods: {
      onClick() {
        this.$emit('btn-click')
      },
    },
  }
</script>
