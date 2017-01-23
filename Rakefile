# Static export
namespace :assets do
  desc 'Build the public assets with node'
  task :build do
    system 'npm run build'
  end
end

namespace :icons do
  desc 'Combine atomic icon files into single file'
  task :combine do
    chunks = File.expand_path(File.join(File.dirname(__FILE__), 'src', 'symbols')) # rubocop:disable Metrics/LineLength
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
            # remove extrta whitespace
            buf.gsub!(/\s+/, ' ')
            # remove XML declaration
            buf.gsub!(/<\?.*?\?>/, '')
            # convert <svg> to <symbol> with id, and keep viewbox attribute
            buf.gsub!(/<svg.*?(viewBox=.[0-9|\s]*.).*?>/, "<symbol id=\"#{File.basename(vol, '.svg')}\" \\1>") # rubocop:disable Metrics/LineLength
            # remove empty <defs>
            buf.gsub!('<defs></defs>', '')
            # remove <g>s
            buf.gsub!(/\s*<g(>|\s.*?>)\s*/, '')
            buf.gsub!(%r{\s*<\/g>\s*}, '')
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
      saved_file.write('
</svg>')
    end
  end
end

task :default do
end
