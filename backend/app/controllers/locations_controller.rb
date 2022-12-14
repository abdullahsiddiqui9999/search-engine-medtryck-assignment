# frozen_string_literal: true

# Location controller
class LocationsController < ActionController::Base
  def search
    request_params = search_params(params)
    search_results = Location.search(request_params['text'])
    respond_to do |format|
      format.json do
        render json: ElasticSearchResultParser.new(search_results,
                                                   ref_lat: request_params['latitude'],
                                                   ref_long: request_params['longitude']).parse
      end
    end
  end

  private

  def search_params(request_params)
    request_params.require(%i[text latitude longitude])

    request_params[:latitude] = request_params[:latitude].to_f
    request_params[:longitude] = request_params[:longitude].to_f

    request_params
  end
end
