<template>
  <div>
    BLOGS
  </div>
</template>

<script>
export default {
  name: 'BlogIndex',
  data () {
    return {
      editorContent: ''
    }
  },
  head () {
    return {
      title: 'Blog',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description'
        }
      ]
    }
  },
}
</script>

<style>

</style>
