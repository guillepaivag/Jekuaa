<template>
    <div>
        <client-only placeholder="loading...">
            <ProgramaEstudio :uidCursoProp="uidCurso" />
        </client-only>
    </div>
</template>

<script>
export default {
    name: '',
    layout: 'miembro',
    middleware: 'esInstructor',
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