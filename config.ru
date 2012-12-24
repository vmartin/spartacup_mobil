use Rack::Static, 
  :urls => ["/assets/images", 
            "/assets/stylesheets", 
            "/assets/add2home",
            "/assets/sounds",
            "/app/sections",
            "/app/templates",
            "/app",
            "/lungojs"],
  :root => "public"

run lambda { |env|
  [
    200, 
    {
      'Content-Type'  => 'text/html', 
      'Cache-Control' => 'public, max-age=86400' 
    },
    File.open('public/index.html', File::RDONLY)
  ]
}
