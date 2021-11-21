<template>
  <div class="container">
    <client-only>
      <!-- <editor v-model="content" />

      <div class="content">
        <h3>Content</h3>
        <pre><code>{{ content }}</code></pre>
      </div> -->

      

      <section>
        <div class="mt-5 mb-5">
          <editor @setContent="setContent($event)" />
        </div>

        <v-divider class="mt-5 mb-5"></v-divider>

        <div v-html="content"></div>

        <v-divider class="mt-5 mb-5"></v-divider>

        <div>
          {{content}}
        </div>
      </section>

      <v-divider class="mt-5 mb-5"></v-divider>

      <v-textarea
        class="mt-2 mb-5"
        name="input-7-1"
        label="Mis especializaciones"
        v-model="md"
      ></v-textarea>

      <v-divider class="mt-5 mb-5"></v-divider>
      {{ md }}
    </client-only>
  </div>
</template>

<script>
import showdown from 'showdown'
import TurndownService from 'turndown'
// import Editor from '@/components/admin/forms/FormBlog'
import Editor from '@/components/Editor'

export default {
  components: {
    'editor': Editor,
  },

  data() {
    return {
      content: `<blockquote><h1>Comenzando con la lógica</h1></blockquote><ul><li><p><em>ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock</em>, a Latin professor at Hampden-Sydney College in Virginia, <s>looked up one of the more obscure Latin words, consectetur</s>, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p></li><li><p><u>ontrary to popular belief, Lorem Ipsum is not simply random text.</u> It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p><br><hr></li></ul><blockquote><h1>Comenzando con los algoritmos</h1></blockquote><ol><li><p><strong>ontrary to popular belief, Lorem Ipsum is not simply random text.</strong> <a href="https://es.wikipedia.org/wiki/Literatura_en_lat%C3%ADn" rel="noopener noreferrer nofollow">It has roots in a piece of classical Latin literature from 45 BC</a>, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p></li><li><p>ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p></li></ol><br><hr><p>ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p><br><p>ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p><br>`,
      md: ``
    }
  },
  
  methods: {
    setContent(content) {
      this.content = content
    },
  },

  watch: {
    content: function (n, v) {
      var options = {
        emDelimiter: '*',
        linkReferenceStyle: 'full',
        linkStyle: 'referenced',
      }

      let turndownService = new TurndownService()
      let markdown = turndownService.turndown(n)

      console.log('markdown', markdown)

      this.md = markdown
    }
  },

  created() {
    var options = {
      emDelimiter: '*',
      linkReferenceStyle: 'full',
      linkStyle: 'referenced',
    }

    let turndownService = new TurndownService()
    let markdown = turndownService.turndown(this.content)

    this.md = markdown
  },
}
</script>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }
}

.content {
  padding: 1rem 0 0;

  h3 {
    margin: 1rem 0 0.5rem;
  }

  pre {
    border-radius: 5px;
    color: #333;
  }

  code {
    display: block;
    white-space: pre-wrap;
    font-size: 0.8rem;
    padding: 0.75rem 1rem;
    background-color:#e9ecef;
    color: #495057;
  }
}
</style>