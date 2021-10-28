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
          <editor @content="setContent($event)" />
        </div>

        <v-divider class="mt-5 mb-5"></v-divider>

        <div v-html="content"></div>
      </section>
    </client-only>
  </div>
</template>

<script>
// import Editor from '@/components/admin/forms/FormBlog'
import Editor from '@/components/admin/forms/Editor'

export default {
  components: {
    'editor': Editor,
  },

  data() {
    return {
      content: ''
    }
  },
  
  methods: {
    setContent(content) {
      this.content = content
    }
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