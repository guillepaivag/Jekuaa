<template>
  <div>
    <div v-if="editor" class="botonesEditor container">
      <button class="botonEditor" @click.prevent="editor.chain().focus().toggleBold().run()" v-bind:class="{ 'is-active': editor.isActive('bold') }">
        bold
      </button>
      <button class="botonEditor" @click.prevent="editor.chain().focus().toggleItalic().run()" v-bind:class="{ 'is-active': editor.isActive('italic') }">
        italic
      </button>
      <button class="botonEditor" @click.prevent="editor.chain().focus().toggleStrike().run()" v-bind:class="{ 'is-active': editor.isActive('strike') }">
        strike
      </button>
      <button class="botonEditor" @click.prevent="editor.chain().focus().toggleCode().run()" v-bind:class="{ 'is-active': editor.isActive('code') }">
        code
      </button>
      <button class="botonEditor" @click.prevent="editor.chain().focus().unsetAllMarks().run()">
        clear marks
      </button>
      <button class="botonEditor" @click.prevent="editor.chain().focus().clearNodes().run()">
        clear nodes
      </button>
      <button class="botonEditor" @click.prevent="editor.chain().focus().setParagraph().run()" v-bind:class="{ 'is-active': editor.isActive('paragraph') }">
        paragraph
      </button>
      <button class="botonEditor" @click.prevent="editor.chain().focus().toggleHeading({ level: 1 }).run()" v-bind:class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        h1
      </button>
      <button class="botonEditor" @click.prevent="editor.chain().focus().toggleHeading({ level: 2 }).run()" v-bind:class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        h2
      </button>
      <button class="botonEditor" @click.prevent="editor.chain().focus().toggleHeading({ level: 3 }).run()" v-bind:class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
        h3
      </button>
      <button class="botonEditor" @click.prevent="editor.chain().focus().toggleHeading({ level: 4 }).run()" v-bind:class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
        h4
      </button>
      <button class="botonEditor" @click.prevent="editor.chain().focus().toggleHeading({ level: 5 }).run()" v-bind:class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
        h5
      </button>
      <button class="botonEditor" @click.prevent="editor.chain().focus().toggleHeading({ level: 6 }).run()" v-bind:class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
        h6
      </button>
      <button class="botonEditor" @click.prevent="editor.chain().focus().toggleBulletList().run()" v-bind:class="{ 'is-active': editor.isActive('bulletList') }">
        bullet list
      </button>
      <button class="botonEditor" @click.prevent="editor.chain().focus().toggleOrderedList().run()" v-bind:class="{ 'is-active': editor.isActive('orderedList') }">
        ordered list
      </button>
      <button class="botonEditor" @click.prevent="editor.chain().focus().toggleCodeBlock().run()" v-bind:class="{ 'is-active': editor.isActive('codeBlock') }">
        code block
      </button>
      <button class="botonEditor" @click.prevent="editor.chain().focus().toggleBlockquote().run()" v-bind:class="{ 'is-active': editor.isActive('blockquote') }">
        blockquote
      </button>
      <button class="botonEditor" @click.prevent="editor.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </button>
      <button class="botonEditor" @click.prevent="editor.chain().focus().setHardBreak().run()">
        hard break
      </button>
      <button class="botonEditor" @click.prevent="addImage">
        setImage
      </button>
      <button class="botonEditor" @click.prevent="editor.chain().focus().undo().run()">
        undo
      </button>
      <button class="botonEditor" @click.prevent="editor.chain().focus().redo().run()">
        redo
      </button>
    </div>
    
    <div class="contenedor_editor">
      <div class="editor"></div>
      <!-- <editor-content :editor="editor" /> -->
    </div>
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
    }
  },

  mounted() {
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
          class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
        },
      },
      content: this.value,
      onUpdate({ editor }) {
        vm.actualizarHTML(editor.getHTML())
      },
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

<style lang="scss" scoped>
/* Basic editor styles */
.editor {
  
}

.contenedor_editor {
  border: 1px solid #000000;
}

.botonesEditor {
  background: #ebebeb;
  border-radius: 1.3rem;
  margin-bottom: 25px;
}

.botonEditor {
  border-radius: 0.5rem;
  background: #683bce;
  color: aliceblue;
  padding: 5px 15px;
  margin: 5px 5px;
}

.is-active {
  background: #ff1d89 !important;
}
</style>