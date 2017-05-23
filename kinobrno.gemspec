# coding: utf-8
Gem::Specification.new do |spec|
  spec.name          = "kinobrno"
  spec.version       = "0.1"
  spec.authors       = ["Artur Khabibullin"]
  spec.email         = ["rtkh@ya.ru"]

  spec.summary       = %q{}
  spec.description   = %q{}
  spec.homepage      = ""

  spec.files         = `git ls-files -z`.split("\x0").reject do |f|
    f.match(%r{^(test|spec|features)/})
  end
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.required_ruby_version = "~> 2.2.4"

  spec.add_dependency "sinatra", "~> 1.4.8"
  spec.add_dependency "faraday", "~> 0.9"

  spec.add_development_dependency "pry"
  spec.add_development_dependency "bundler", "~> 1.13"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "rspec", "~> 3.0"
end
