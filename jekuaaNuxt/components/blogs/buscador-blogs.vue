<template>
    <div class="container">
        <ais-instant-search-ssr>
            <ais-search-box />
            <ais-stats />
            <ais-refinement-list attribute="brand" />
            <ais-hits>
                <template v-slot:item="{ item }">
                    <p>
                        <ais-highlight attribute="titulo" :hit="item" />
                    </p>
                     - 
                    <p>
                        <ais-highlight attribute="descripcion" :hit="item" />
                    </p>
                </template>
            </ais-hits>
            <ais-pagination />
        </ais-instant-search-ssr>
    </div>
</template>

<script>
import {
  AisInstantSearchSsr,
  AisRefinementList,
  AisHits,
  AisHighlight,
  AisSearchBox,
  AisStats,
  AisPagination,
  createServerRootMixin,
} from 'vue-instantsearch';
import algoliasearch from 'algoliasearch/lite';
import _renderToString from 'vue-server-renderer/basic';
// import 'instantsearch.css/themes/satellite-min.css';

function renderToString(app) {
  return new Promise((resolve, reject) => {
    _renderToString(app, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

const searchClient = algoliasearch(
    'RNRNTDZS3N',
    'af4d4e9d36a7ceb75e258007c3ceccf2'
)

export default {
  mixins: [
    createServerRootMixin({
      searchClient,
      indexName: 'blogs_dev',
    }),
  ],
  serverPrefetch() {
    return this.instantsearch
      .findResultsState({
        component: this,
        renderToString,
      }).then(algoliaState => {
        this.$ssrContext.nuxt.algoliaState = algoliaState;
      });
  },
  beforeMount() {
    const results =
      (this.$nuxt.context && this.$nuxt.context.nuxtState.algoliaState) ||
      window.__NUXT__.algoliaState;

    this.instantsearch.hydrate(results);

    // Remove the SSR state so it can't be applied again by mistake
    delete this.$nuxt.context.nuxtState.algoliaState;
    delete window.__NUXT__.algoliaState;
  },
  components: {
    AisInstantSearchSsr,
    AisRefinementList,
    AisHits,
    AisHighlight,
    AisSearchBox,
    AisStats,
    AisPagination,
  },
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite-min.css',
        },
      ],
    };
  },
};
</script>