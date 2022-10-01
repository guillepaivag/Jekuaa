<template>
  <div>
    <div v-if="editor" class="botonesEditor">
      <v-btn
        title="Negrita"
        fab
        dark
        small
        color="#683bce"
        class="botonEditor"
        @click.prevent="editor.chain().focus().undo().run()"
      >
        <span class="material-icons">
          undo
        </span>
      </v-btn>
      <v-btn
        title="Negrita"
        fab
        dark
        small
        color="#683bce"
        class="botonEditor"
        @click.prevent="editor.chain().focus().redo().run()"
      >
        <span class="material-icons">
          redo
        </span>
      </v-btn>
      <v-btn
        title="Negrita"
        fab
        dark
        small
        color="#683bce"
        class="botonEditor"
        v-bind:class="{ 'is-active': editor.isActive('bold') }"
        @click.prevent="editor.chain().focus().toggleBold().run()" 
      >
        <span class="material-icons">
          format_bold
        </span>
      </v-btn>

      <v-btn
        title="Negrita"
        fab
        dark
        small
        color="#683bce"
        class="botonEditor"
        v-bind:class="{ 'is-active': editor.isActive('italic') }"
        @click.prevent="editor.chain().focus().toggleItalic().run()"
      >
        <span class="material-icons">
          format_italic
        </span>
      </v-btn>

      <v-btn
        title="Negrita"
        fab
        dark
        small
        color="#683bce"
        class="botonEditor"
        @click.prevent="editor.chain().focus().toggleStrike().run()" 
        v-bind:class="{ 'is-active': editor.isActive('strike') }"
      >
        <span class="material-icons">
          format_strikethrough
        </span>
      </v-btn>

      <v-btn
        title="Negrita"
        fab
        dark
        small
        color="#683bce"
        class="botonEditor"
        @click.prevent="editor.chain().focus().toggleCode().run()" 
        v-bind:class="{ 'is-active': editor.isActive('code') }"
      >
        <span class="material-icons">
          data_object
        </span>
      </v-btn>

      <v-btn
        title="Negrita"
        fab
        dark
        small
        color="#683bce"
        class="botonEditor"
        @click.prevent="editor.chain().focus().toggleCodeBlock().run()" 
        v-bind:class="{ 'is-active': editor.isActive('codeBlock') }"
      >
        <span class="material-icons">
          code
        </span>
      </v-btn>

      <v-btn
        title="Negrita"
        fab
        dark
        small
        color="#683bce"
        class="botonEditor"
        @click.prevent="addImage"
      >
        <span class="material-icons">
          image
        </span>
      </v-btn>

      <!-- <button class="botonEditor" @click.prevent="editor.chain().focus().setParagraph().run()" v-bind:class="{ 'is-active': editor.isActive('paragraph') }">
        paragraph
      </button> -->

      <v-btn
        title="Negrita"
        fab
        dark
        small
        color="#683bce"
        class="botonEditor"
        @click.prevent="editor.chain().focus().toggleHeading({ level: 1 }).run()" 
        v-bind:class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        H1
      </v-btn>

      <v-btn
        title="Negrita"
        fab
        dark
        small
        color="#683bce"
        class="botonEditor"
        @click.prevent="editor.chain().focus().toggleHeading({ level: 2 }).run()" 
        v-bind:class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        H2
      </v-btn>

      <v-btn
        title="Negrita"
        fab
        dark
        small
        color="#683bce"
        class="botonEditor"
        @click.prevent="editor.chain().focus().toggleHeading({ level: 3 }).run()" 
        v-bind:class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        H3
      </v-btn>

      <v-btn
        title="Negrita"
        fab
        dark
        small
        color="#683bce"
        class="botonEditor"
        @click.prevent="editor.chain().focus().toggleHeading({ level: 4 }).run()" 
        v-bind:class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      >
        H4
      </v-btn>

      <v-btn
        title="Negrita"
        fab
        dark
        small
        color="#683bce"
        class="botonEditor"
        @click.prevent="editor.chain().focus().toggleHeading({ level: 5 }).run()" 
        v-bind:class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
      >
        H5
      </v-btn>

      <v-btn
        title="Negrita"
        fab
        dark
        small
        color="#683bce"
        class="botonEditor"
        @click.prevent="editor.chain().focus().toggleHeading({ level: 6 }).run()" 
        v-bind:class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
      >
        H6
      </v-btn>

      <v-btn
        title="Negrita"
        fab
        dark
        small
        color="#683bce"
        class="botonEditor"
        @click.prevent="editor.chain().focus().toggleBulletList().run()" 
        v-bind:class="{ 'is-active': editor.isActive('bulletList') }"
      >
        <span class="material-icons">
          format_list_bulleted
        </span>
      </v-btn>

      <v-btn
        title="Negrita"
        fab
        dark
        small
        color="#683bce"
        class="botonEditor"
        @click.prevent="editor.chain().focus().toggleOrderedList().run()" 
        v-bind:class="{ 'is-active': editor.isActive('orderedList') }"
      >
        <span class="material-icons">
          format_list_numbered
        </span>
      </v-btn>

      <v-btn
        title="Negrita"
        fab
        dark
        small
        color="#683bce"
        class="botonEditor"
        @click.prevent="editor.chain().focus().toggleBlockquote().run()" 
        v-bind:class="{ 'is-active': editor.isActive('blockquote') }"
      >
        <span class="material-icons">
          format_quote
        </span>
      </v-btn>

      <v-btn
        title="Negrita"
        fab
        dark
        small
        color="#683bce"
        class="botonEditor"
        @click.prevent="editor.chain().focus().setHorizontalRule().run()"
      >
        <span class="material-icons">
          horizontal_rule
        </span>
      </v-btn>

      <v-btn
        title="Negrita"
        fab
        dark
        small
        color="#683bce"
        class="botonEditor"
        @click.prevent="editor.chain().focus().unsetAllMarks().run()"
      >
        <span class="material-icons">
          format_clear
        </span>
      </v-btn>

      <v-btn
        title="Negrita"
        fab
        dark
        small
        color="#683bce"
        class="botonEditor"
        @click.prevent="editor.chain().focus().clearNodes().run()"
      >
        <span class="material-icons">
          layers_clear
        </span>
      </v-btn>

      <!-- <button class="botonEditor" @click.prevent="editor.chain().focus().setHardBreak().run()">
        hard break
      </button> -->
    </div>
    
    <div class="editor" style="border-style: solid;"></div>
  </div>
</template>

<script>
import { Editor, EditorContent, VueNodeViewRenderer } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'

export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
    }
  },

  props: {
    value: String,
    contenidoNuevo: String,
  },

  methods: {
    addImage() {
      const url = window.prompt('URL')

      if (url) {
        this.editor.chain().focus().setImage({ src: url }).run()
      }
      
    },
    actualizarHTML (html) {
      this.$emit('input', html)
    },
    setEditor () {
      let vm = this
      this.editor = new Editor({
        element: document.querySelector('.editor'),
        extensions: [
          StarterKit,
          Document,
          Paragraph,
          Text,
          Image.configure({
            inline: true,
          }),
          Dropcursor,
        ],
        editorProps: {
          attributes: {
            class: 'contenedor_editor',
          },
        },
        content: this.value,
        onUpdate({ editor }) {
          vm.actualizarHTML(editor.getHTML())
        },
      })
    },
  },

  watch: {
    contenidoNuevo: function (n, v) {
      if (n !== v) {
        this.editor.destroy()
        this.value = this.contenidoNuevo
        this.setEditor()
      }
    }
  },

  mounted() {
    this.setEditor()
  },

  created () {
    
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

<style lang="scss" scoped>
/* Basic editor styles */
.botonesEditor {
  margin-bottom: 25px;
}

.botonEditor {
  background: #683bce;
  color: #ffffff;
  padding: 5px 10px;
  margin: 3px 3px;
}

.is-active {
  background: #ff1d89 !important;
}
</style>