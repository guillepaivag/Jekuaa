<template>
  <div>
    <ClientOnly>
      <!-- Use the component in the right place of the template -->
      <tiptap-vuetify 
        v-model="computedContent" 
        :extensions="extensions"
      />

      <template #placeholder>
        Loading...
      </template>
    </ClientOnly>
  </div>
</template>

<script>
// import the component and the necessary extensions
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
  Image
} from 'tiptap-vuetify'

export default {
  // specify TiptapVuetify component in "components"
  components: { TiptapVuetify },
  data() {
    return {
      extensions: [
        History,
        Blockquote,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3]
            }
          }
        ],
        Bold,
        Link,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak,
        Image,
      ],
    }
  },
  props: {
    value: String,
  },
  watch: {
    
  },
  computed: {
    computedContent: {
      get: function () {
        return this.value+''
      },
      set: function (v) {
        this.$emit('setContent', v)
      },
    }
  },
  mounted() {
    
  }
}
</script>