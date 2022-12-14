# frozen_string_literal: true

# Elastic Search Results Parser
class ElasticSearchResultParser
  def initialize(result, options = {})
    @result = result
    @options = options
  end

  def parse
    num_of_hits = @result.response['hits']['total']['value']

    {
      totalHits: num_of_hits,
      totalDocuments: num_of_hits,
      results: @result.response['hits']['hits'].map do |hit|
        parsed_entity = parse_entity(hit['_index'], hit['_source'])
        parsed_entity['score'] = hit['_score']

        parsed_entity
      end
    }
  end

  private

  def parse_entity(index, entity_hash)
    return parse_location_entity(entity_hash) if index == 'locations'
  end

  def parse_location_entity(entity_hash)
    {
      id: entity_hash['id'],
      name: entity_hash['title'],
      position: {
        lat: entity_hash['latitude'],
        lng: entity_hash['longitude']
      },
      distance: ServiceUtils.calculate_manhattan_distance(@options[:ref_lat], @options[:ref_long],
                                                          entity_hash['latitude'], entity_hash['longitude'])
    }
  end
end
