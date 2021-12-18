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
  CodeBlock,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
  Image,
} from 'tiptap-vuetify'
import ImagenURL from '@/components/tiptap/vuetify/ImagenURL'

export default {
  // specify TiptapVuetify component in "components"
  components: {
    TiptapVuetify,
    ImagenURL,
  },
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
        CodeBlock,
        HorizontalRule,
        Paragraph,
        HardBreak,
        [Image, {
          options: {
            imageSourcesOverride: true,
            imageSources: [
              { component: ImagenURL, name: 'Ingresar URL' },
            ]
          }
        }],
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
        return this.value
      },
      set: function (v) {
        this.$emit('input', v)
      },
    }
  },
  mounted() {
    
  }
}
</script>