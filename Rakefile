# Static export

namespace :assets do
  desc 'Build the public assets with node'
  task :build do
    system 'npm run clean'
    system 'npm run build'
  end
end

namespace :icons do
  desc 'Combine atomic icon files into single file'
  task :combine do
    chunks = File.expand_path(File.join(File.dirname(__FILE__), 'src', 'symbols')) # rubocop:disable Style/LineLength
    combo = './src/combo.svg'
    open(combo, 'w') do |saved_file|
      saved_file.write('<svg xmlns="http://www.w3.org/2000/svg">
    ')
    end

    Dir.entries(chunks).reject { |f| f =~ /^[\.|\_]*[\.]$/ }.each do |vol|
      begin
        open(combo, 'a') do |saved_file|
          open(File.join(chunks, vol), 'rb') do |read_file|
            buf = read_file.read
            buf.gsub!('svg xmlns="http://www.w3.org/2000/svg"', 'symbol id="' + File.basename(vol, '.svg') + '"') # rubocop:disable Style/LineLength
            buf.gsub!('</svg>', '</symbol>')
            buf += '
    '
            saved_file.write(buf)
          end
        end
        puts vol + ' copied'
      end
    end

    open(combo, 'a') do |saved_file|
      saved_file.write('</svg>')
    end
  end
end

task :default do
end
