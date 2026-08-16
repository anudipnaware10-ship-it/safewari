package anudip.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaWebConfig {

    // Forwards any non-API, non-static browser route (e.g. /register, /login,
    // /dashboard) back to index.html so React Router can handle it client-side.
    @RequestMapping(value = {
            "/{path:^(?!api|assets|favicon\\.ico).*$}",
            "/{path:^(?!api|assets|favicon\\.ico).*$}/**"
    })
    public String forward() {
        return "forward:/index.html";
    }
}