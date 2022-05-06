<template>
    <div>
        <client-only placeholder="loading...">
            <ProgramaEstudio :uidCursoProp="uidCurso" />
        </client-only>
    </div>
</template>

<script>
// import ProgramaEstudio from '@/components/cursos-borrador/miembro/ProgramaEstudio'

export default {
    name: '',
    data() {
        return {
            uidCurso: this.$route.params.uidCurso,
        }
    },
    props: {

    },
    components: {
        ProgramaEstudio: () => {
            if(process.client){
                return import('@/components/cursos-borrador/miembro/ProgramaEstudio')
            }
        },
    },
    created() {
        
    },
}
</script>

<style>

</style>