# frozen_string_literal: true

# Service Utils
class ServiceUtils
  def self.calculate_manhattan_distance(lat1, long1, lat2, long2)
    distance = (lat1 - lat2).abs + (long1 - long2).abs

    return "#{(distance / 1000).round(2)}kms" if distance > 1000

    "#{distance.round(2)}m"
  end
end
