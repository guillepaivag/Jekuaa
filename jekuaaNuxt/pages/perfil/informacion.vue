<template>
    <div>
        <client-only>
            <!-- <editor v-model="content" />

            <div class="content">
                <h3>Content</h3>
                <pre><code>{{ content }}</code></pre>
            </div> -->

            

            <section>
                <div class="mt-5 mb-5">
                    <editor-information @content="setContent($event)" />
                </div>

                <v-divider class="mt-5 mb-5"></v-divider>

                <!-- <div v-html="content"></div> -->
                {{content}}
            </section>
        </client-only>
    </div>
</template>

<script>
import EditorInformation from '@/components/EditorInformation'

export default {
  components: {
    'editor-information': EditorInformation,
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

<style>

</style>