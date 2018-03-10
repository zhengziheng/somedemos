let vm = new Vue({
    el:'#app',
    data:{
        title:'',
        cur:{},
        hash:'',
        todos:[
            {
                isSelected:false,
                title:'睡觉',
            },
            {
                isSelected:false,
                title:'吃饭',
            },
            
        ]
    },
    methods:{
        add(){//keydown keyup差一个单词，keydown的时候内容没有进入到输入框里
            this.todos.push({
                isSelected:false,
                title:this.title,
            })
            this.title=''
        },
        remove(todo){
            //拿到当前点击的 todo和数组里面的比对相等就删除
            this.todos=this.todos.filter(item=>item!==todo)
        },
        remember(todo){
            this.cur = todo
        },
        cancel(){
            this.cur=''
        }

    },
    computed:{
        count:{
            get(){//get必须写return方法
                return this.todos.filter(item=>!item.isSelected).length
            },
        },
        filterTodos(){
            if(this.hash==='all'){
                return this.todos
            }
            if(this.hash==='finish'){
                return this.todos.filter(item=>item.isSelected)
            }
            if(this.hash==='unfinish'){
                return this.todos.filter(item=>!item.isSelected)
            }
            return this.todos
        },
    },
    created(){//初始化数据
        // 如果localstorage里面有数据就用有的，没有就用默认的
        
        this.todos = JSON.parse(localStorage.getItem('data'))||this.todos
        //监控hash的变化 如果页面有hash了 重新刷新页面也获取hash
        this.hash = window.location.hash.slice(2)||'all'
        window.addEventListener('hashchange',()=>{
            //当操作的hash值变化重新操作记录的数据
            this.hash = window.location.hash.slice(2)
        })
    
    },

    watch:{
        // todos(){//默认只监控一层的数据变化在这个todos里面只能监控到todo的增加和删除
        //     // 数组里面对象的变化他监控不到
        //     // 深度监控怎么做。

        // }
        todos:{
            handler(){//相当于上面的todos（）他默认是handler
                //localStorage默认存的是字符串
                localStorage.setItem('data',JSON.stringify(this.todos))
            },deep:true
        }
    },
})