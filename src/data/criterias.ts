const criterias = [
    {
        title: 'Type',
        field: 'type_tournage',
        data: ['Long métrage', 'Série TV', 'Téléfilm']
    },
    {
        title: 'Année',
        field: 'annee_tournage',
        data: Array(100).fill((new Date()).getFullYear() - 1).map((a, cum) => (++a - cum) + '' )
    },
    {   
        title: 'Arrondissement',
        field: 'ardt_lieu',
        data: Array(20).fill(75000).map((a, cum) => (++a + cum) + '')
    }
];

export default criterias;