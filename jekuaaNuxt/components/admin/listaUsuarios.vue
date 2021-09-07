<template>

</template>

<script>
export default {
    data() {
        return {
            listaUsuarios: []
        }
    },
    methods: {
        async pagination(){

            try {
                const db = this.$firebase.firestore()

                let next = db.collection('Usuarios')

                next = this.filtracion(next, this.dataFilter)
                
                next = next.startAfter(this.lastDocumentList).limit(this.limit);

                const snapshot = await next.get();

                if(snapshot.size > 0) {
                    snapshot.forEach(snap => {
                        this.usersDataList.push(snap.data())
                    })
                    
                    this.lastDocumentList = snapshot.docs[snapshot.docs.length - 1];
                } else {
                    this.moreDataList = false
                }
            } catch (error) {
                console.log('error', error)

            }

        },
    },
}
</script>

<style>

</style>