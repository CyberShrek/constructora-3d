package org.neway.constructora3d.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class Index {

    @GetMapping
    fun getIndex() = "dev.html"
}