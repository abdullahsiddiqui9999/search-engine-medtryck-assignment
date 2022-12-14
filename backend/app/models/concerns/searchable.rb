# frozen_string_literal: true

# This concern makes a model searchable in Elastic Search
module Searchable
  extend ActiveSupport::Concern

  included do
    include Elasticsearch::Model
    include Elasticsearch::Model::Callbacks

    mapping do
      indexes :title, type: :text
    end

    def self.search(query)
      params = {
        query: {
          match: {
            title: query
          }
        }
      }
      __elasticsearch__.search(params)
    end
  end
end
