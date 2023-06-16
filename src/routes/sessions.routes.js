import { Router } from "express";
import passport from "passport";

const router = Router();

//ruta para registrar al usuario
router.post("/signup", passport.authenticate("signupStrategy",{
    failureRedirect:"/api/sessions/failed-signup"
}), (req,res)=>{
    res.render("login",{message:"Usuario registrado correctamente"});
});

router.get("/failed-signup",(req,res)=>{
    res.send("<p>Hubo un error al registrar al usuario <a href='/signup'>Intente de nuevo</a></p>");
});

//ruta para loguear al usuario
router.post("/login", passport.authenticate("loginStrategy",{
    failureRedirect:"/api/sessions/failed-login"
}), (req,res)=>{
    res.redirect("/profile");
});

router.get("/failed-login",(req,res)=>{
    res.send("<p>Hubo un error al iniciar sesion <a href='/login'>Intente de nuevo</a></p>");
});


//ruta para cerrar sesion
router.get("/logout",(req,res)=>{
    req.logOut(error=>{
        if(error){
            return res.send('no se pudo cerrar sesion, <a href="/profile">ir al perfil</a>');
        } else {
            req.session.destroy(err=>{
                if(err) return res.send('no se pudo cerrar sesion, <a href="/profile">ir al perfil</a>');
                res.redirect("/")
            });
        }
    })
});

export {router as sessionsRouter};