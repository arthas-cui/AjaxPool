# AjaxPool
Just an ajax tool helps you to call them one by one. In that case, we can call ajax as a list. We can avoid to send all ajax requests together. 

at first, you should creat a pool like this:
var pool  = $.ajaxPool();

and then insert ajax request config one by one.

just like :
pool.push({
			type:'get',
			cache:0,
			url:'ajaxPool.js',
			success:function(){
				console.log('1 success');
			}
		});

you can see it is just normal jquery ajax config. 

and then, after inster all of them, just call exec like:
pool.exec();

and then they will be run one by one. 

note:now we link all ajax by "success" callback. 
so when one fail, all remaining will not be fired. 

I'm considering to use "complete". but not sure. 

welcome to told me your suggestion. 

and, see demo.html for more detail. 