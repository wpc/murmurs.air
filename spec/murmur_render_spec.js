Screw.Unit(function() {
  describe("MurmurRenderPipes", function() {
    var preference

    before(function() {
      preference = new Preference()
      preference.reset()
    })

    var render = function(content) {
      return MurmurRenderPipes.render(content)
    }

    it("should escape html tag", function() {
      expect(render("<h1>dddd</h1>")).to(equal, "&lt;h1&gt;dddd&lt;/h1&gt;")
    })

    it("should append cr with br", function() {        
      expect(render("sss\nxxx")).to(equal, "sss\n<br/>xxx")
    })

    it("should replace #ddd with card link", function() {
      preference.host("http://example.com")
      preference.project_id("n1")
      expect(render("fix bug #111.")).to(equal, 'fix bug <a href="http://example.com/projects/n1/cards/111">#111</a>.')
    })
  })
})
