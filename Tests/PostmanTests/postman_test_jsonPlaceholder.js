pm.test("Verify status = from 2xx", () => {
    pm.expect(pm.response.code).to.be.oneOf([200,201,202,204])
    pm.expect(pm.response.code).to.be.a("number")
})

pm.test("Verify status = 'OK'", () => {
    pm.response.to.have.status("OK")
    pm.expect(pm.response.status).to.be.a("string")
})

pm.test("Verify status code, is not 4xx & 5xx", () => {
    pm.expect(pm.response.code).to.be.not.oneOf([400,401,404,405,500,503,504])
})

pm.test("Verify responseTime", () => {
    pm.expect(pm.response.responseTime).to.be.lessThan(500)
})

pm.test("Check size of response", () => {
    pm.expect(pm.response.responseSize).to.be.lessThan(28000)
})

pm.test("Verify header = Connection", () => {
    pm.response.to.have.header("Connection")
})

pm.test("check what is insied in Connection header", () => {
     pm.expect(pm.response.headers.get("Connection")).to.be.oneOf(["keep-alive", "close"]);
})

let connectionHeader = pm.expect(pm.response.headers.get("Connection")).to.be.oneOf(["keep-alive", "close"]);

if (connectionHeader){
    console.log("Keep alive is inside of Connection header")
}else{
    console.log("The 'close' is inside of Connection header")
}

pm.test("What is inside of Server header", () => {
    pm.expect(pm.response.headers.get("Server")).to.eq("cloudflare")
})

let lenAge = pm.expect(pm.response.headers.get('Age'))

const Body = pm.response.json();

pm.test("Is not Body empty?", () => {
    pm.expect(Body).to.be.not.empty;
})

pm.test("Is that a object", () => {
    pm.expect({
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }).to.be.an("object")
})



pm.test("Check that each object has a title", () => {
    Body.map(titel => {
        pm.expect(titel.title).is.exist;
    })
})

pm.test("Check that each object has a ID", () => {
    Body.map(id => {
        pm.expect(id.id).is.exist;
    })
})

pm.test("Chech that all titel has got a one letter like = a,b,d,e", () => {
    Body.map(titel => {
        pm.expect(titel.title).to.include.oneOf(["a", "b", "d", "e"]);
    })
})


pm.collectionVariables.set("Test", "https://test.com")
