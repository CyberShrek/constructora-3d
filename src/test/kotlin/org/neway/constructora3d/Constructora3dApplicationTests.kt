package org.neway.constructora3d

import org.junit.jupiter.api.Test
import org.neway.constructora3d.controller.IndexController
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get

@SpringBootTest
@AutoConfigureMockMvc
class Constructora3dApplicationTests(
    @Autowired val mockMvc: MockMvc) {

    @Test
    fun testIndex() {
        mockMvc.get("/")
            .andExpect{ status { isOk() } }
    }
}
