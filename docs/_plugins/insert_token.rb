module InsertToken
    def insert_token(input)
        input.sub("<script>", "<script>\nL.mapbox.accessToken = '<your access token here>';")
             .sub("<script type='text/coffeescript'>", "<script type='text/coffeescript'>\nL.mapbox.accessToken = '<your access token here>'")
    end
end

Liquid::Template.register_filter(InsertToken)
