/**
 * Created by GuoXiang on 2016/9/22.
 */
var pr_vm = new Vue({
    el: '#prize-result-container',
    data: {
        ticketSum: 0,
        myTicket: 0,
        userId: null
    },
    methods: {
        getResultList: function(){
            var vm = this;
            rest.get({
                url: '/api/user-ticket/'+vm.userId+'/user-ticket'
            },function(data){
                vm.$set('resultList',data.items);
                vm.ticketSum = data.count;
                vm.myTicket = data.items.length;
            })
        }
    },
    ready: function(){
        var vm = this;
        if(storage.get("userId")){
            vm.userId = storage.get("userId");
        }
        //vm.userId = 1;
        vm.getResultList();
    }
})