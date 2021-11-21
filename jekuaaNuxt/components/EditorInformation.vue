<template>
  <ClientOnly>
    <!-- Use the component in the right place of the template -->
    <tiptap-vuetify 
      v-model="content" 
      :extensions="extensions"
      :toolbar-attributes="{ color: '#683bce', dark: true }"
      :card-props="{ flat: false, color: '#ffffff' }"
    />

    <template #placeholder>
      Loading...
    </template>
  </ClientOnly>
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
  Image,
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
        HorizontalRule,
        HardBreak,
        Image,
      ],
      content: `
        <blockquote><h1>Comenzando con la lógica</h1></blockquote><ul><li><p><em>ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock</em>, a Latin professor at Hampden-Sydney College in Virginia, <s>looked up one of the more obscure Latin words, consectetur</s>, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p></li><li><p><u>ontrary to popular belief, Lorem Ipsum is not simply random text.</u> It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p><br><hr></li></ul><blockquote><h1>Comenzando con los algoritmos</h1></blockquote><ol><li><p><strong>ontrary to popular belief, Lorem Ipsum is not simply random text.</strong> <a href="https://es.wikipedia.org/wiki/Literatura_en_lat%C3%ADn" rel="noopener noreferrer nofollow">It has roots in a piece of classical Latin literature from 45 BC</a>, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p></li><li><p>ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p></li></ol><br><hr><p>ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p><br><p>ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p><br>
      `
    }
  },
  watch: {
    'content': function(nuevo, viejo) {
      this.$emit('content', this.content)
    }
  },
  mounted() {
    this.$emit('content', this.content)
  }
}
</script>