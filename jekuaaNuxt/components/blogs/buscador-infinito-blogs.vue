<template>
  <div>
    <div class="container">
      <ais-instant-search
        :search-client="searchClient"
        :index-name="indexName"
      >
        <div class="search-panel">
          <div class="search-panel__results">
            <ais-search-box placeholder="Busque los blogs" class="searchbox" />
            <app-infinite-hits-blogs>
              <template slot="item" slot-scope="{ item }">
                <ais-highlight :hit="item" attribute="titulo" />
              </template>
            </app-infinite-hits-blogs>
          </div>
        </div>
      </ais-instant-search>
    </div>
  </div>
</template>

<script>
import {
  AisSearchBox,
  AisInstantSearch,
  AisHighlight,
} from 'vue-instantsearch';
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/algolia-min.css';
import InfiniteHitsBlogs from '@/components/blogs/InfiniteHitsBlogs'

export default {
  components: {
    'app-infinite-hits-blogs': InfiniteHitsBlogs,
    'ais-instant-search': AisInstantSearch,
    'ais-search-box': AisSearchBox,
    'ais-highlight': AisHighlight,
  },
  data() {
    return {
      searchClient: algoliasearch(
        'RNRNTDZS3N',
        'af4d4e9d36a7ceb75e258007c3ceccf2'
      ),
      indexName: process.env.NODE_ENV === 'production' ? 'blogs_prod' : 'blogs_dev',
    };
  },
  created() {
    
  },
};
</script>

<style scoped>
body,
h1 {
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}

.ais-Highlight-highlighted {
  background: cyan;
  font-style: normal;
}

.header {
  display: flex;
  align-items: center;
  min-height: 50px;
  padding: 0.5rem 1rem;
  background-image: linear-gradient(to right, #4dba87, #2f9088);
  color: #fff;
  margin-bottom: 1rem;
}

.header a {
  color: #fff;
  text-decoration: none;
}

.header-title {
  font-size: 1.2rem;
  font-weight: normal;
}

.header-title::after {
  content: ' ▸ ';
  padding: 0 0.5rem;
}

.header-subtitle {
  font-size: 1.2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.search-panel {
  display: flex;
}

.search-panel__filters {
  flex: 1;
  margin-right: 1em;
}

.search-panel__results {
  flex: 3;
}

.searchbox {
  margin-bottom: 2rem;
}

.pagination {
  margin: 2rem auto;
  text-align: center;
}
</style>
