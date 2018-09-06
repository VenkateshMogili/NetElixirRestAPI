var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://venkatesh:venkatesh123@ds145752.mlab.com:45752/netelixir',['users']);
var db2 = mongojs('mongodb://venkatesh:venkatesh123@ds145752.mlab.com:45752/netelixir',['reviews']);
var db3 = mongojs('mongodb://venkatesh:venkatesh123@ds145752.mlab.com:45752/netelixir',['empadmins']);

//all users
router.get('/allemployees',function(req,res,next){
	db.users.find(function(err,users){
		if(err){
            res.send({
                success:false,
                message:"Error",
                data:[]
            });
		} else {
            res.send({
                success:true,
                message:"Records returned",
                data:users
            });
        }
	});
});

//all reviews
router.get('/allreviews',function(req,res,next){
    db2.reviews.find(function(err,reviews){
        if(err){
        	res.send({
				success:false,
				message:"Error",
				data:[]
			});
        } else{
        	res.send({
				success:true,
				message:"Records returned",
				data:reviews
			});
		}
    });
});
//all assigned employees
router.get('/allassigned',function(req,res,next){
    db3.empadmins.find(function(err,employees){
        if(err){
            res.send({
                success:false,
                message:"Error",
                data:[]
            });
        } else{
            res.send({
                success:true,
                message:"Records returned",
                data:employees
            });
        }
    });
});
//login with email and password
router.get('/login/:email/:password',function(req,res,next){
	console.log(req.params.email);
	console.log(req.params.password);
	db.users.find({email: req.params.email, password: req.params.password},function(err,data){
		if(data.length===0){
			console.log('error');
			res.send({
				success:false,
				message:'error',
				data:[]
			});
		} else{
			console.log('success');
			res.send({success: true,
			message:'Returned',
			data:data
		});
		}
	});
});


//admin code
//adding employee
router.post('/admin/addemployees/',function(req,res,next){
	var data = req.body;
	if(!data.email || !data.password || !data.username){
		res.send({
			success:false,
			message:'Bad Data',
			data:[]
		});
	} else{
        db.users.find({email: data.email }, function(err,result) {
            if(result.length>=1){
            	res.send({
					success:false,
					message:'Error',
					data:[]
				});
			} else {
                db.users.save(data, function (err, data) {
                    if (err) {
                        res.send({
                            success: false,
                            message: 'Error',
                            data: []
                        });
                    } else {
                        res.send({
                            success: true,
                            message: 'Added Successfully....',
                            data: data
                        });
                    }
                });
			}
        });
	}
});
//delete employee
router.delete('/admin/delete/:id',function(req,res,next){
	console.log('deleting user');
		db.users.remove({_id: mongojs.ObjectId(req.params.id)},function(err,data){
			if(err){
                res.send({
                    success:false,
                    message:'error',
                    data:[]
                });
			} else {
                res.send({
                    success:true,
                    message:'Deleted successfully...',
                    data:data
                });
			}
		});
});
//update employee
router.put('/admin/updateemployee/',function(req,res,next){
	var data = req.body;
	var email= data['email'];
	if(!data.email || !data.password || !data.username){
        res.send({
            success:false,
            message:'error',
            data:[]
        });
	} else{
		db.users.update({email:email},data,{},function(err,data){
			if(err){
                res.send({
                    success:false,
                    message:'error',
                    data:[]
                });
			} else{
                res.send({
                    success:true,
                    message:'Updated',
                    data:data
                });
			}
		});
	}
});
//Adding review
//adding employee
router.post('/admin/addreviews/',function(req,res,next){
    var data = req.body;
    if(!data.email){
        res.send({
            success:false,
            message:'Bad Data',
            data:[]
        });
    } else{
        db2.reviews.find({email: data.email }, function(err,result) {
            if(result.length>=1){
                res.send({
                    success:false,
                    message:'Error',
                    data:[]
                });
            } else {
                db.reviews.save(data, function (err, data) {
                    if (err) {
                        res.send({
                            success: false,
                            message: 'Error',
                            data: []
                        });
                    } else {
                        res.send({
                            success: true,
                            message: 'Added Successfully....',
                            data: data
                        });
                    }
                });
            }
        });
    }
});
//assigning employees
router.post('/admin/assignemployees/',function(req,res,next){
    console.log('assigning employees');
    var data = req.body;
    console.log(data['_id']);
    console.log(data);
    db2.reviews.update({email:data.email},data,{},function(err,datas){
        if(err){
            console.log('error');
            res.send({
                success:false,
                message:'error',
                data:[]
            });
        } else{
            console.log('returned successfully...');
            var email1 = data['email1'];
            if(!data.email1 || !data.email2){
                res.send({
                    success:false,
                    message:'Bad Data',
                    data:[]
                });
            } else{
                db3.empadmins.find({email2: data.email2 }, function(err,result) {
                    if(result.length>=1){
                        res.send({
                            success:false,
                            message:'Error',
                            data:[]
                        });
                    } else {
                        db3.empadmins.save({email1:data.email1,email2:data.email2}, function (err, resultt) {
                            if (err) {
                                console.log('error');
                                res.send({
                                    success: false,
                                    message: 'Error',
                                    data: []
                                });
                            } else {
                                console.log('success');
                                res.send({
                                    success: true,
                                    message: 'success'
                                });
                            }
                        });

                    }
                });
            }
        }
    });

});

//update review
router.put('/admin/updatereviews/',function(req,res,next){
    var data = req.body;
    var email= data['email'];
    if(!data.email){
        res.send({
            success:false,
            message:'error',
            data:[]
        });
    } else{
        db2.reviews.update({email2:email},data,{},function(err,data){
            if(err){
                console.log('error');
                res.send({
                    success:false,
                    message:'error',
                    data:[]
                });
            } else{
                console.log('returned successfully...');
                res.send({
                    success:true,
                    message:'Updated',
                    data:data
                });
            }
        });
    }
});
//submitting review
router.put('/editreview',function(req,res,next){
    var data = req.body;
    var email= data['email'];
    if(!data.email || !data.password || !data.username){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else{
        db.users.update({email:email},data,{},function(err,data){
            if(err){
                res.send(err);
            }
            res.json(data);
        });
    }
});

module.exports = router;