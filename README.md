# Course-selling-app


  // const requiredBody = z.object({
  //   email: z.string().min(3).max(20).email(),
  //   password: z.string().min(3).max(20),
  //   firstName: z.string().min(3).max(20),
  //   lastName: z.string().min(3).max(20)

  // })
  // const parseDataWithSuccess = requiredBody.safeParse(req.body);

  // if (!parseDataWithSuccess.success) {
  //   res.json({
  //     message: "Incorrect format",
  //     error: parseDataWithSuccess.error
  //   })
  //   return
  // }
  
  // hashing password
 
  // const hashedpassword =  crypto.hash(password,10)