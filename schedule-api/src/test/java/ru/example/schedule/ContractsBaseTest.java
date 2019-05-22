package ru.example.schedule;

import io.restassured.module.mockmvc.RestAssuredMockMvc;
import org.junit.Before;

public abstract class ContractsBaseTest {

    private ScheduleController scheduleController = new ScheduleController();


    @Before
    public void setup() {
        RestAssuredMockMvc.standaloneSetup(scheduleController);
    }
}
